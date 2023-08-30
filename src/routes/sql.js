const router = require("koa-router")();
const Oracle = require("../oracleDb/index");

router.prefix("/sql");
router.post("/connect", async function (ctx, next) {
  try {
    const config = JSON.parse(ctx.request.body);
    const connect = Oracle.getInstance(config, true);
    var isSuccess = await connect.getConnected();
    if (isSuccess) {
      ctx.body = {
        msg: "连接成功",
        code: 200,
      };
    } else {
      ctx.body = {
        msg: "连接失败",
        code: 400,
      };
    }
  } catch (error) {
    ctx.body = {
      msg: "连接失败",
      code: 400,
    };
  }
});
router.post("/execute", function (ctx, next) {
  const sql = JSON.parse(ctx.request.body).sql;
  const connect = Oracle.getInstance();
  if (connect.isSuccess) {
    try {
      const result = connect.execute();
      ctx.body = {
        msg: "查询成功",
        result: result,
        code: 200,
      };
    } catch (error) {
      ctx.body = {
        msg: error,
        result: error,
        code: 400,
      };
    }
  } else {
    ctx.body = {
      msg: "连接失败，请先连接",
      result: "连接失败，请先连接",
      code: 400,
    };
  }
});
module.exports = router;
