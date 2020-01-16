// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import store from '../../store/common';
// import CommonStore from '@/store/common';
import OutputStore from '../output/store/index.store';
// import ScrollToTop from '@/components/scrolltotop';
import './index.less';
// import Menubar from '../menubar';
import asyncComponent from '../../components/asyncComponent';

import OutputBox from '../output';
import CodeBox from '../code';
import codeStore from '../code/store/code.store';

import intl from '../../store/intl';
import debugStore from "../debug/store/debug.store";
import { Link, Redirect } from 'react-router-dom';
export default class LayoutIndex extends React.Component<any, any> {
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }
  public state = {
    lang: store.language === 'en' ? 'en' : 'zh', // zh为中，en为英
    isSearch: false, // 是否在搜索中，默认false
    currentState: false,
  }
  private codeEditor = React.createRef<CodeBox>();
  public componentDidMount() {
    console.log();
  }

  public render() {
    return (
      <div className="layout-container debugger-layout">
        
        {
                                // asyncComponent(() => import('../../containers/debug'))
                                // <div>kek</div>
                              
                                  //  <div to="/debug"></div>
                                <Redirect to="/debug">dddd</Redirect>

                }

{/* <OutputBox intl={ intl } debug={ debugStore } output={ OutputStore } onSizeChange={ this.onSizeChange } history={ this.context.router.history } /> */}

            { this.props.children }
         
          {/* <div className="code-container"> */}
          {/* <CodeBox codeStore={ codeStore } ref={ this.codeEditor } intl={ intl } /> */}
            <OutputBox intl={ intl } debug={ debugStore } output={ OutputStore } onSizeChange={ this.onSizeChange } history={ this.context.router.history } />
          {/* </div> */}
       
      </div>
    );
  }
  // 切换语言
  public onChangeLanguage = (lang: string) => {
    if (lang === "zh") {
      store.setLanguage('zh');
      sessionStorage.setItem('language', 'zh');
      this.setState({
        lang: 'zh'
      })
    } else {
      store.setLanguage('en');
      sessionStorage.setItem('language', 'en');
      this.setState({
        lang: 'en'
      })
    }
  }
  public onSidebarChange = (state: boolean) => {
    this.setState({ currentState: state }, () => {
      if (this.codeEditor.current) {
        this.codeEditor.current.editorLayout();
      }
    });
  }
  private onSizeChange = () => {
    if (this.codeEditor.current) {
      this.codeEditor.current.editorLayout();
    }
  }

}