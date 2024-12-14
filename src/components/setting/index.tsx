import { IntlProvider } from "react-intl";
import {getLocale} from 'umi';
import SettingDrawer from './SettingDrawer';
import enUS from "@/locales/en-US";
import zhCN from "@/locales/zh-CN";

function DrawerBox() {
    const messages = {
        "en-US":enUS,
        "zh-CN":zhCN
    }
    const locale = getLocale()
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <SettingDrawer />
        </IntlProvider>
    )
}

export default DrawerBox