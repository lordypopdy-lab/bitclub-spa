export function useAuth(){
  return { user: localStorage.getItem("user") }
}
