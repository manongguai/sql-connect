const oracledb = require("oracledb");

class Oracle {
  isConnected = false;
  isSuccess = false;
  timer = null;
  static getInstance(config = {}, isCreate = false) {
    if (isCreate) {
      // 如果是新的连接，要把之前的关闭
      if (Oracle._instance) {
        Oracle._instance.close();
      }
      Oracle._instance = new Oracle(config);
    }
    if (!Oracle._instance) {
      Oracle._instance = new Oracle(config);
    }
    return Oracle._instance;
  }
  constructor(config) {
    this.run(config);
  }
  async run(config) {
    try {
      const connection = await oracledb.getConnection(config);
      this.connection = connection;
      this.isConnected = true;
      this.isSuccess = true;
    } catch (error) {
      this.isConnected = true;
      this.isSuccess = false;
    }
  }
  getConnected() {
    return new Promise((resolve, reject) => {
      this.timer = setTimeout(() => {
        if (this.isConnected) {
          resolve(this.isSuccess);
          clearTimeout(this.timer);
        } else {
          this.getConnected();
        }
      }, 100);
    });
  }
  close() {
    if (this.connection) {
      this.connection.close();
    }
  }
  async execute(sql) {
    const result = await this.connection.execute(sql);
    return result;
  }
}

module.exports = Oracle;
