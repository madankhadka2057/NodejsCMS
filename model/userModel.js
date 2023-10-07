module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      otp: {
        type: DataTypes.STRING,
        allowNull:true
      },
      otpGeneratedTime: {
        type: DataTypes.STRING,
        allowNull:true
      },
    });
    return user;
  };
