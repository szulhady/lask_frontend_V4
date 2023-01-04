export const IoSocketStatus = () => import('../..\\node_modules\\nuxt-socket-io\\lib\\components\\SocketStatus.js' /* webpackChunkName: "components/io-socket-status" */).then(c => wrapFunctional(c.default || c))
export const BarChartHorizontal = () => import('../..\\components\\BarChartHorizontal.vue' /* webpackChunkName: "components/bar-chart-horizontal" */).then(c => wrapFunctional(c.default || c))
export const Button = () => import('../..\\components\\Button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c))
export const Button2 = () => import('../..\\components\\Button2.vue' /* webpackChunkName: "components/button2" */).then(c => wrapFunctional(c.default || c))
export const ButtonTraining = () => import('../..\\components\\ButtonTraining.vue' /* webpackChunkName: "components/button-training" */).then(c => wrapFunctional(c.default || c))
export const ClassButton = () => import('../..\\components\\ClassButton.vue' /* webpackChunkName: "components/class-button" */).then(c => wrapFunctional(c.default || c))
export const ClassList = () => import('../..\\components\\ClassList.vue' /* webpackChunkName: "components/class-list" */).then(c => wrapFunctional(c.default || c))
export const DialogTraining = () => import('../..\\components\\DialogTraining.vue' /* webpackChunkName: "components/dialog-training" */).then(c => wrapFunctional(c.default || c))
export const Header = () => import('../..\\components\\Header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const Logo = () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const Model = () => import('../..\\components\\Model.vue' /* webpackChunkName: "components/model" */).then(c => wrapFunctional(c.default || c))
export const Notification = () => import('../..\\components\\Notification.vue' /* webpackChunkName: "components/notification" */).then(c => wrapFunctional(c.default || c))
export const Pie = () => import('../..\\components\\Pie.vue' /* webpackChunkName: "components/pie" */).then(c => wrapFunctional(c.default || c))
export const SingleLineChart = () => import('../..\\components\\SingleLineChart.vue' /* webpackChunkName: "components/single-line-chart" */).then(c => wrapFunctional(c.default || c))
export const SingleLineChartPerformance = () => import('../..\\components\\SingleLineChartPerformance.vue' /* webpackChunkName: "components/single-line-chart-performance" */).then(c => wrapFunctional(c.default || c))
export const Status = () => import('../..\\components\\Status.vue' /* webpackChunkName: "components/status" */).then(c => wrapFunctional(c.default || c))
export const Status2 = () => import('../..\\components\\Status2.vue' /* webpackChunkName: "components/status2" */).then(c => wrapFunctional(c.default || c))
export const Status3 = () => import('../..\\components\\Status3.vue' /* webpackChunkName: "components/status3" */).then(c => wrapFunctional(c.default || c))
export const Summary = () => import('../..\\components\\Summary.vue' /* webpackChunkName: "components/summary" */).then(c => wrapFunctional(c.default || c))
export const VuetifyLogo = () => import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const LoginForm = () => import('../..\\components\\Login\\Form.vue' /* webpackChunkName: "components/login-form" */).then(c => wrapFunctional(c.default || c))
export const RegisterForm2 = () => import('../..\\components\\Register\\Form2.vue' /* webpackChunkName: "components/register-form2" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
