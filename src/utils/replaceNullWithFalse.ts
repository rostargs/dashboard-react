export const replaceNullWithFalse = <T>(obj: T): T => {
    const updatedObj = { ...obj }; 
  
    for (const key in updatedObj) {
      if (updatedObj[key] === null) {
        updatedObj[key] = false as T[Extract<keyof T, string>];
      }
    }
  
    return updatedObj;
  };