import * as coordinates from './coordinate-editor';
import * as drawing from './drawing-controls';
import _DrawingMenu from './drawing-menu';
import * as geometry from './geometry';
import _Renderer from './renderer';
import * as shapes from './shape-utils';
export declare namespace renderer {
    const Renderer: typeof _Renderer;
}
export declare namespace menu {
    const DrawingMenu: typeof _DrawingMenu;
}
export { coordinates, drawing, geometry, shapes };
