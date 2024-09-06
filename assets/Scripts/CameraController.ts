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
    const moveScale = 0.01;
    const curPos = this.node.position;
    this.node.setPosition(
      curPos.x - event.getDeltaX() * moveScale,
      curPos.y - event.getDeltaY() * moveScale,
      curPos.z
    );
  }

  onTouchEnd(event: EventTouch) {}

  update(deltaTime: number) {}
}
