import {
  _decorator,
  Component,
  EventTouch,
  Input,
  input,
  instantiate,
  Node,
  Prefab,
  RigidBody,
  Vec3,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {
  @property({ type: Prefab })
  public bulletPrefab: Prefab;

  @property(Node)
  public bulletParent: Node;

  @property
  public bulletSpeed: number = 40;

  @property
  public fireRate: number = 0.3;

  private touched: boolean = false;
  private fireTime: number = 0;

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {
    this.touched = true;
  }

  onTouchEnd(event: EventTouch) {
    this.touched = false;
  }

  update(deltaTime: number) {
    // 只有在触摸状态下才会发射子弹
    if (this.touched) {
      // 根据游戏的帧率来计算发射子弹的时间间隔
      this.fireTime += deltaTime;
      if (this.fireTime > this.fireRate) {
        this.fire();
        this.fireTime = 0;
      }
    }
  }

  fire() {
    // 实例化子弹并设置到父节点
    const bullet = instantiate(this.bulletPrefab);
    bullet.setParent(this.bulletParent);

    // 设置子弹初始化位置，以下两种方式都可以，不同之处在于是否与父节点（相机）的世界坐标系有关
    bullet.setWorldPosition(this.node.position);
    // bullet.setPosition(0, 0, 0);

    // 设置子弹的初始速度
    const rgd = bullet.getComponent(RigidBody);
    rgd.setLinearVelocity(new Vec3(0, 0, -this.bulletSpeed));
  }
}
