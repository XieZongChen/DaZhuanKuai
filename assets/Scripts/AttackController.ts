import { _decorator, Component, Input, input, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {
  @property({ type: Prefab })
  public bulletPrefab: Prefab;

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  onTouchStart(event: any) {
    const bullet = instantiate(this.bulletPrefab);
    bullet.setParent(this.node);
  }

  update(deltaTime: number) {}
}
