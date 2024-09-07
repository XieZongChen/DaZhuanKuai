import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 通用的高度方向销毁组件
 */
@ccclass('AltitudeDestroy')
export class AltitudeDestroy extends Component {
    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        if(pos.y < -10) {
            this.node.destroy();
        }
    }
}

