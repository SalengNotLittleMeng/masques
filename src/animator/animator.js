function nowtime() {
  if (typeof performance !== "undefined" && performance.now) {
    return performance.now();
  }
  return Date.now ? Date.now() : new Date().getTime();
}
/**
 * Animator类，封装的动画函数
 * @constructor
 * @param {number} duration 第一个是动画的总时长.
 * @param {function} update - 动画每一帧的 update 事件.
 * @param {function} easing - 动画的行进速率.
 */

class Animator {
  constructor(duration, update, easing) {
    this.duration = duration;
    this.update = update;
    this.easing = easing;
  }

  animate() {
    let startTime = 0,
      duration = this.duration,
      update = this.update,
      easing = this.easing,
      self = this;

    return new Promise(function (resolve, reject) {
      let qId = 0;

      function step(timestamp) {
        startTime = startTime || timestamp;
        let p = Math.min(1.0, (timestamp - startTime) / duration);

        update.call(self, easing ? easing(p) : p, p);

        if (p < 1.0) {
          qId = requestAnimationFrame(step);
        } else {
          resolve(self);
        }
      }

      self.cancel = function () {
        cancelAnimationFrame(qId);
        update.call(self, 0, 0);
        reject("User canceled!");
      };

      qId = requestAnimationFrame(step);
    });
  }
  ease(easing) {
    return new Animator(this.duration, this.update, easing);
  }
}
export default Animator;
