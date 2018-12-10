export default class utils {
    // 小数点限制 data-数据， num-小数点限制位数， roundOff-是否四舍五入
    static decimal(data, num, roundOff = false) {
        const arr = data.toString().split('.');
        if (arr.length > 2) {
            return `${arr[0]}.`;
        }
        if (arr.length <= 1 || arr[1].length < 3) {
            return data;
        }
        const reg = new RegExp(`^\\d{1,${num}}`);
        const regt = new RegExp(`^\\d{1,${num+1}}`);
        if (roundOff && arr[1][2] > 4) {
            const numb = Math.ceil(`${arr[0]}${arr[1].match(reg)[0]}.${arr[1][num]}`).toString();
            const n = numb.slice(arr[0].length, numb.length);
            return `${numb.toString().replace(/\d{2}$/, '')}.${n}`;
        }
        return `${arr[0]}.${arr[1].match(reg)[0]}`;
    }
    static amount(data) {
        if (data > 99999999) {
            return `${data.toString().slice(0,8)}`;
        } else {
            return this.decimal(data, 2);
        }
    }
    static getStorage(key) {
        return new Promise(function(resolve, reject) {
            wx.getStorage({
                key: key,
                success: function(res) {
                    resolve(res.data);
                },
                fail: function(res) {
                    resolve(null);
                },
            });
        });
    }
    static setStorage(key, data) {
        return new Promise(function(resolve, reject) {
            wx.setStorage({
                key: key,
                data: data,
                success: function(res) {
                    resolve(res.data);
                },
                fail: function(res) {
                    resolve(null);
                },
            });
        });
    }
    static removeStorage(key) {
        return new Promise(function(resolve, reject) {
            wx.removeStorage({
                key: key,
                success: function(res) {
                    resolve(res.data);
                },
                fail: function(res) {
                    resolve(null);
                },
            });
        });
    }
    static dataGenerator(labels, keys = ['value'], min = 10, max = 50) {
        // return new Promise(function(resolve, reject) {
        return labels.map(label => {
            let d = {
                    label: labels
                }
                // console.log(d);

            keys.map(key => {
                d[key] = Math.floor(Math.random() * (max - min + 1) + min)
                console.log(d[key]);
            });

            console.log((d));
            return (d)
        })

        // })
    }
}