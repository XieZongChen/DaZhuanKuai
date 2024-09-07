import {
  _decorator,
  Component,
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

  @property
  public bulletSpeed: number = 40;

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  onTouchStart(event: any) {
    // 创建子弹并设置到父节点
    const bullet = instantiate(this.bulletPrefab);
    bullet.setParent(this.node);

    // 设置子弹初始化位置，以下两种方式都可以，不同之处在于是否与父节点（相机）的世界坐标系有关
    bullet.setWorldPosition(this.node.position);
    // bullet.setPosition(0, 0, 0);

    // 设置子弹的初始速度
    const rgd = bullet.getComponent(RigidBody);
    rgd.setLinearVelocity(new Vec3(0, 0, -this.bulletSpeed));
  }

  update(deltaTime: number) {}
}
