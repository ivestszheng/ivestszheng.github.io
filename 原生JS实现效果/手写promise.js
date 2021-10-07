class Commitment {
    static PENDING = '待定'
    static FULFILLED = '成功'
    static REJECTED = '拒绝'
    constructor(func) {
        this.status = Commitment.PENDING
        this.result = null
        func(this.resolve.bind(this), this.reject.bind(this))
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

}