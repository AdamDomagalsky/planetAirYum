const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const counter = value =>
  new Promise(resolve => {
    if (value === 0) {
      resolve();
    } else {
      console.log(value);
      resolve(delay(5).then(() => counter(value - 1)));
    }
  });

counter(5).then(x => console.log("Finished!"));
