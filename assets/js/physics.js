class CollisionDetector {

  isCollision(a,b) {
    return this.testCollision(a,b) || this.testCollision(b,a);
  }

  testCollision(a,b) {
    let corner,lines,code;
    if(b.constructor.name === 'Circle') {
      for(corner of a.corners) {
        if(distance(corner,b.pos) <= b.radius) {
          return true;
        }
      }
      return false;
    }
    // check the same for the other object!
    for(corner of a.corners) {
      if(distance(corner,b.pos) > b.maxCollDist) {
        continue;
      }

      lines = b.corners.map(c => {
        return new Line(corner,c);
      });

      if(b.rotation !== 0) {
        lines = lines.map(l => {
          l.end = l.end.rotateTo(l.start,-b.rotation);
          return l;
        })
      }

      code = lines.map(l => {
        return l.translateStartTo(new Vector2(0,0));
      }).map(l => {
        l.end.x = l.end.x !== 0 ? l.end.x / Math.abs(l.end.x) : 0;
        l.end.y = l.end.y !== 0 ? l.end.y / Math.abs(l.end.y) : 0;
        return l.end.x + l.end.y;
      }).sort((a,b) => {return a-b}).reduce((ac,e) => {
        return ac + e;
      },"");
      if(['-2002','-2-1-10','-2-101','-1001','-1012','0112'].includes(code)) {
        return true;
      }

    }
    return false;
  }
}

class CollisionResolver {
  static resolveCollision() {

  }


}
