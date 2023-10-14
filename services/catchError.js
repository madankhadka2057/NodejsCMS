module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => {
        if (err) {
          res.send("Error is:"+err);
          return;
        } 
      });
    };
};
  
// module.exports = (fn) => {
//     return (req, res, next) => {
//         const result = fn(req, res, next);

//         if (result instanceof Promise) {
//             result.catch((err) => {
//                 res.send("Something went wrong on this page");
//             });
//         }
//     };
// };
