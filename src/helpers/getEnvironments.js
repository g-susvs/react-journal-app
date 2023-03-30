
export const getEnvironments = () => {

  // cargar env
  import.meta.env

  return {
    ...import.meta.env
  }
}
