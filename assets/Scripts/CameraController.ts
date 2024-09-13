import {
  _decorator,
  Component,
  EventTouch,
  Input,
  input,
  math,
  Node,
  Rect,
  Vec3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
  /**
   * 相机移动范围的最小值
   */
  @property(Vec3)
  public moveMin: Vec3 = new Vec3(-10, 0, 0);

  /**
   * 相机移动范围的最大值
   */
  @property(Vec3)
  public moveMax: Vec3 = new Vec3(10, 10, 0);

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {}

  onTouchMove(event: EventTouch) {
    // moveScale 用于控制移动速度，避免移动过快
    const moveScale = 0.01;
    const curPos = this.node.position;
    // 为了符合移动端的滑动方向，这里需要将移动距离取反
    const moveX = math.clamp(
      curPos.x - event.getDeltaX() * moveScale,
      this.moveMin.x,
      this.moveMax.x
    );
    const moveY = math.clamp(
      curPos.y - event.getDeltaY() * moveScale,
      this.moveMin.y,
      this.moveMax.y
    );
    this.node.setPosition(moveX, moveY, curPos.z);
  }

  onTouchEnd(event: EventTouch) {}

  update(deltaTime: number) {}
}
