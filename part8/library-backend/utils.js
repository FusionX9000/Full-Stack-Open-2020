const does = (a) => {
  return {
    match: (b) => {
      const ans = Object.entries(b)
        .map(([k, v]) => a[k] && a[k] === v)
        .every(Boolean);
      console.log(a, b, ans);
      return ans;
    },
  };
};

export default {
  does,
};
