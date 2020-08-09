/*
  exportされるインスタンスはシングルトンになる
  （モジュールを複数のファイルからimportしたとしても
  初回import時のみインスタンスが生成されてそれ以降は
  同一インスタンスを利用する仕様になっている）ので
  リロードするまではアプリケーション内で一意のキーが生成されるはず
*/
export const key = new (class {
  private initialTime: number
  private previousTime = 0
  private count = 0

  constructor() {
    this.initialTime = this.getCurrentTime()
    console.log(this.initialTime)
  }

  private getCurrentTime(): number {
    return Math.floor(Date.now() * 0.001)
  }

  generate(): string {
    const elapsedTime = this.getCurrentTime() - this.initialTime
    let subKey = ''

    if (this.previousTime === elapsedTime) {
      subKey = '_' + this.count.toString(36)
      this.count++
    } else {
      this.count = 0
    }

    this.previousTime = elapsedTime
    console.log(elapsedTime.toString(36) + subKey)
    return elapsedTime.toString(36) + subKey
  }
})()
