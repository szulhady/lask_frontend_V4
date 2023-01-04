export default function ({ $auth, redirect }) {
  if ($auth.hasScope('Lecturer')) {
    // console.log("this is not admin")
    return redirect('/overview2')
  }
  if (!$auth.hasScope('Student')) {
    // console.log("this is not admin")
    return redirect('/login')
  }

}