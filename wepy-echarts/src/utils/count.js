/**
 * 工具箱，用于浮点型运算
 */
export default class count {
    /** 
     * 加法运算
    */
    static add(a, b) {
        if (a === null || b === null) {
            if (a !== null) return a;
            if (b !== null) return b;
            return 0;
        }
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
    }
    /** 
     * 减法运算
    */
    static sub(a, b) {
        if (a === null || b === null) {
            if (a !== null) return a;
            if (b !== null) return -b;
            return 0;
        }
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
    }
    /** 
     * 乘法运算
    */
    static mul(a, b) {
        var c = 0,
        d = a.toString(),
        e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
    /** 
     * 除法运算
    */
    static div(a ,b) {
        var c, d, e = 0,
        f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
    }
}