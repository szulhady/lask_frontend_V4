export default function ({ $auth, redirect }) {
  if (!$auth.hasScope('Lecturer')) {
    // console.log("this is not admin")
    return redirect('/login')
  }

}