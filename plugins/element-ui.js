import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

//按需加载
import { Message,Button,Input,Dialog,Radio,Select,Option} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;
// Vue.use(Element, { locale })
