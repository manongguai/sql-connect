async function addUser(ctx, next) {
  const test = new Test();
  try {
    var r = await test.addTest({ nickName: "zah" });
    ctx.body = "success";
  } catch (error) {
    ctx.body = error;
  }
}

export default {
  addUser,
};
