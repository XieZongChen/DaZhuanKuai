import { _decorator, Component, EventTouch, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {
  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {}

  onTouchMove(event: EventTouch) {
    // moveScale 用于控制移动速度，避免移动过快
    const moveScale = 0.01;
    const curPos = this.node.position;
    // 为了符合移动端的滑动方向，这里需要将移动距离取反
    this.node.setPosition(
      curPos.x - event.getDeltaX() * moveScale,
      curPos.y - event.getDeltaY() * moveScale,
      curPos.z
    );
  }

  onTouchEnd(event: EventTouch) {}

  update(deltaTime: number) {}
}
