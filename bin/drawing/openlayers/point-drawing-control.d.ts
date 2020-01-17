import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import ModifiableDrawingControl from './modifiable-drawing-control';
import { Shape } from '../../shapes/shape';
/**
 * Drawing Control for drawing a point on an Open Layers Map
 */
declare class PointDrawingControl extends ModifiableDrawingControl {
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getShape(): Shape;
    getGeoType(): GeometryType;
    cancelDrawing(): void;
    protected makeEmptyFeature(): Feature;
    protected updateLabel(_feature: Feature): void;
}
export default PointDrawingControl;
