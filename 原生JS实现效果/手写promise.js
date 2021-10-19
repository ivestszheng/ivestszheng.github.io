class Commitment {
    static PENDING = '待定'
    static FULFILLED = '成功'
    static REJECTED = '拒绝'
    constructor(func) {
        this.status = Commitment.PENDING
        this.result = null
        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        if (this.status === Commitment.PENDING) {
            this.status = Commitment.FULFILLED
            this.result = result
        }
    }

    reject(result) {
        if (this.status === Commitment.PENDING) {
            this.status = Commitment.REJECTED
            this.result = result
        }
    }
    then(onFULFILED, onREJECTED) {
        onFULFILED = typeof onFULFILED === 'function' ? onFULFILED : () => { }
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { }
        if (this.status === Commitment.FULFILLED) {
            setTimeout(() => {
                onFULFILED(this.result)
            });
        }
        if (this.status === Commitment.REJECTED) {
            setTimeout(() => {
                onREJECTED(this.result)
            });
        }
    }
}
console.log('第一步');
let commitment = new Commitment((resolve, reject) => {
    console.log('第二步');
    setTimeout(() => {
        resolve('这次一定')
        console.log('第四步');
    });
})
commitment.then(
    result => { console.log(result); },
    result => { console.log(result.message); }
)
console.log('第三步');