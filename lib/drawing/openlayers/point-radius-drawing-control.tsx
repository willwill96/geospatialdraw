import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import Circle from 'ol/geom/Circle'
import Style from 'ol/style/Style'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import GeometryType from 'ol/geom/GeometryType'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape, POINT_RADIUS } from '../../shapes/shape'
import { GeometryJSON, HIDDEN_CLASSNAME } from '../../geometry/geometry'
import { getBufferPropOrDefault } from '../../geometry/utilities'
import { METERS, KILOMETERS } from '../../geometry/units'
import {
  getDistanceInMeters,
  getDistanceFromMeters,
} from '../../internal/distance'

type DrawingFeatures = {
  feature: Feature
  bufferFeature: Feature
}

/**
 * Drawing Control for a circle/point radius on an Open Layers Map
 */
class PointRadiusDrawingControl extends BasicDrawingControl {
  private animationFrameId: number
  private animationFrame: () => void
  private initalCenter: [number, number]

  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.animationFrameId = 0
    this.animationFrame = () => {}
    this.onCompleteDrawing = this.onCompleteDrawing.bind(this)
    this.onStartDrawing = this.onStartDrawing.bind(this)
    this.onStartModify = this.onStartModify.bind(this)
    this.onCompleteModify = this.onCompleteModify.bind(this)
    this.initalCenter = [0, 0]
  }

  private startDrawAnimation(feature: Feature) {
    let revision = feature.getRevision()
    this.animationFrame = () => {
      const update = feature.getRevision()
      if (update !== revision) {
        revision = update
        const pointFeature = new Feature(
          this.updatePointFromRadiusLine(this.toLine(feature))
        )
        this.applyPropertiesToFeature(pointFeature)
        this.context.updateBufferFeature(pointFeature, false)
      }
      this.animationFrameId = requestAnimationFrame(this.animationFrame)
    }
    this.animationFrame()
  }

  private stopDrawAnimation(feature: Feature): GeometryJSON {
    cancelAnimationFrame(this.animationFrameId)
    this.animationFrame = () => {}
    const point = this.updatePointFromRadiusLine(this.toLine(feature))
    const pointFeature = new Feature(point)
    const { width, unit } = getBufferPropOrDefault(this.properties)
    const radius = getDistanceInMeters(width, unit)
    let bestFitRadiusUnit = unit
    if (bestFitRadiusUnit === METERS && radius > 1000) {
      bestFitRadiusUnit = KILOMETERS
    }
    this.setProperties({
      ...this.properties,
      buffer: {
        width: getDistanceFromMeters(radius, bestFitRadiusUnit),
        unit: bestFitRadiusUnit,
      },
    })
    const geoJSON: GeometryJSON = this.writeExtendedGeoJSON(
      pointFeature
    ) as GeometryJSON
    return geoJSON
  }

  private reorientRadiusLineFeature(center: [number, number]) {
    this.initalCenter = center
    const line = this.makeRadiusLineFromPoint(center)
    const feature = new Feature(line)
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
  }

  onCompleteDrawing(e: any) {
    this.inputBlocked = false
    const feature = this.getFeatureFromDrawEvent(e)
    const geoJSON = this.stopDrawAnimation(feature)
    this.applyPropertiesToFeature(feature)
    this.receiver(geoJSON)
  }

  onStartDrawing(e: any) {
    this.inputBlocked = true
    const feature = this.getFeatureFromDrawEvent(e)
    const source = this.context.getSource()
    source.getFeatures().forEach(f => source.removeFeature(f))
    this.initalCenter = this.toLine(feature).getCoordinates()[0]
    this.startDrawAnimation(feature)
  }

  onStartModify(e: any) {
    this.inputBlocked = true
    const feature = this.getFeatureModifyEvent(e)
    const line = this.toLine(feature)
    const clickedPoint = line.getClosestPoint(e.mapBrowserEvent.coordinate)
    const distanceMap = line
      .getCoordinates()
      .map(point => turf.distance(point, clickedPoint))
    const classNames = distanceMap[0] < distanceMap[1] ? [HIDDEN_CLASSNAME] : []
    feature.set('class', classNames)
    this.startDrawAnimation(feature)
  }

  onCompleteModify(e: any) {
    this.inputBlocked = false
    const feature = this.getFeatureModifyEvent(e)
    const g = feature.getGeometry()
    if (g) {
      g.getType()
    }
    feature.unset('class')
    const geoJSON = this.stopDrawAnimation(feature)
    const center = this.toLine(feature).getCoordinates()[0]
    if (!this.pointsEqual(center, this.initalCenter)) {
      this.reorientRadiusLineFeature(center)
    }
    this.receiver(geoJSON)
  }

  makeFeatures(geoJSON: GeometryJSON): DrawingFeatures {
    const bufferFeature = this.geoFormat.readFeature(geoJSON)
    const line = this.makeRadiusLineFromPoint(
      this.toPoint(bufferFeature).getCoordinates() as [number, number]
    )
    const feature = new Feature(line)
    return {
      feature,
      bufferFeature,
    }
  }

  private makeRadiusLineFromPoint(
    point: [number, number],
    bearing: number = 90
  ): LineString {
    const { width, unit } = getBufferPropOrDefault(this.properties)
    const meters = getDistanceInMeters(width, unit)
    const destination = turf.rhumbDestination(point, meters, bearing, {
      units: 'meters',
    })
    const end = (destination.geometry as turf.Point).coordinates as [
      number,
      number
    ]
    return new LineString([point, end])
  }

  private pointsEqual(a: [number, number], b: [number, number]) {
    return a[0] === b[0] && a[1] === b[1]
  }

  private toLine(feature: Feature): LineString {
    return feature.getGeometry() as LineString
  }

  private toPoint(feature: Feature): Point {
    return feature.getGeometry() as Point
  }

  private updatePointFromRadiusLine(line: LineString): Point {
    const center = line.getCoordinates()[0]
    if (this.pointsEqual(center, this.initalCenter)) {
      const distance = turf.rhumbDistance(
        line.getCoordinates()[0],
        line.getCoordinates()[1],
        {
          units: 'meters',
        }
      )
      const { unit } = getBufferPropOrDefault(this.properties)
      const width = getDistanceFromMeters(distance, unit)
      this.setProperties({
        ...this.properties,
        buffer: {
          width,
          unit,
        },
      })
    }
    return new Point(line.getCoordinates()[0])
  }

  private getFeatureFromDrawEvent(e: any): Feature {
    return e.feature
  }

  private getFeatureModifyEvent(e: any): Feature {
    return e.features.getArray()[0]
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const { feature, bufferFeature } = this.makeFeatures(geoJSON)
    this.initalCenter = this.toPoint(bufferFeature).getCoordinates() as [
      number,
      number
    ]
    this.applyPropertiesToFeature(feature)
    this.applyPropertiesToFeature(bufferFeature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(bufferFeature, false)
    this.startDrawingInteraction()
  }

  getStaticStyle(): Style | Style[] {
    const circleFeature = new Feature(new Circle([0, 0], 1))
    this.applyPropertiesToFeature(circleFeature)
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(circleFeature, 1)
    } else {
      return style
    }
  }

  startDrawing(): void {
    this.context.removeFeature()
    this.startDrawingInteraction()
  }

  private startDrawingInteraction(): void {
    const drawInteraction = new Draw({
      type: this.getGeoType(),
      style: this.getStaticStyle(),
      maxPoints: 2,
      source: this.context.getSource(),
    })
    this.drawingActive = true
    this.context.setModifyInteraction(
      new Modify({
        insertVertexCondition: () => false,
        deleteCondition: () => false,
        source: this.context.getSource(),
      })
    )
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'drawend', this.onCompleteDrawing)
    this.context.setEvent('draw', 'drawstart', this.onStartDrawing)
    this.context.setEvent('modify', 'modifyend', this.onCompleteModify)
    this.context.setEvent('modify', 'modifystart', this.onStartModify)
    this.context.addInteractions()
  }

  getShape(): Shape {
    return POINT_RADIUS
  }

  getGeoType(): GeometryType {
    return GeometryType.LINE_STRING
  }

  cancelDrawing() {
    // uses custom modify interaction
    this.context.remakeInteractions()
    super.cancelDrawing()
  }
}

export default PointRadiusDrawingControl
