class helper{
   isNull(value) {
      if (value != null && value != "") {
        return true;
      } else {
        return false;
      }
    }

    isOneNotNullInObject(array) {
        const arrayFailed = Object.entries(array).map((arr) => {
            if (arr[1] == null || arr[1] == "") {
                return false;
            } else {
                return true;
            }
        });
        return arrayFailed.includes(true);
    }
}
export default new helper();