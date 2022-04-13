import checkImageUrlValid from "./checkImageUrlValid"

export const UPDATE_FORM = "UPDATE_FORM"
export const RESET = "RESET"

export const validateInput = (name:string, value:string) => {
  console.log(process.env.REACT_APP_USERNAME);
  let hasError = false,
    error = ""
  switch (name) {
    case "username":
      if (value.trim() !== process.env.REACT_APP_USERNAME) {
        hasError = true
        error = "Invalid username"
      } else {
        hasError = false
        error = ""
      }
      break
    case "password":
      if (value.trim() !== process.env.REACT_APP_PASSWORD) {
        hasError = true
        error = "Invalid password"
      } else {
        hasError = false
        error = ""
      }
      break
    case "category":
      if (value.trim() === "") {
        hasError = true
        error = "Category cannot be empty"
      } else {
        hasError = false
        error = ""
      }
      break
    case "recipe_name":
      if (value.trim() === "") {
        hasError = true
        error = "Recipe cannot be empty"
      } else {
        hasError = false
        error = ""
      }
      break

    case "ingedient":
      if (value.trim() === "") {
        hasError = true
        error = "Ingedient cannot be empty"
      } else {
        hasError = false
        error = ""
      }
      break

    //    else if (!/^[a-zA-Z ]+$/.test(value)) {
    //     hasError = true
    //     error = "Invalid title. Avoid Special characters"
    //   }


    case "description":
      if (value.trim() === "") {
        hasError = true
        error = "Description cannot be empty"
      } else {
        hasError = false
        error = ""
      }
      break
    case "thumbnail":
      if (value.trim() === "") {
        hasError = true
        error = "Image cannot be empty"
      } else if (!checkImageUrlValid(value)) {
        hasError = true
        error = "Invalid image URL."
      } else {
        hasError = false
        error = ""
      }
      break
    default:
      break
  }
  return { hasError, error }
}

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (name:string, value :string, dispatch:any, formState:any) => {
  const { hasError, error } = validateInput(name, value)
  let isFormValid = true

  for (const key in formState) {
    const item = formState[key]
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false
      break
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false
      break
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  })
}

export const onFocusOut = (name:string, value :string, dispatch:any, formState:any) => {
  const { hasError, error } = validateInput(name, value)
  let isFormValid = true
  for (const key in formState) {
    const item = formState[key]
    if (key === name && hasError) {
      isFormValid = false
      break
    } else if (key !== name && item.hasError) {
      isFormValid = false
      break
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  })
}