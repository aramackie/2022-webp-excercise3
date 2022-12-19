import { useState } from "react";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">QRコード生成ツール</h1>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <div className="message is-info">
      <div className="message-header">
        <p>このWebページについて</p>
      </div>
      <div className="message-body">
        <div className="content">
          <p>このWebページは、日本大学文理学部情報科学科 Webプログラミングの演習課題として作成されました。</p>
          <p>作成者：荒牧諒亮（5421004）</p>
        </div>
      </div>
    </div>
  );
}

function Form(props) {
  const minSize = 50;
  const maxSize = 1000;
  const handleChange = (event) => {
    return (e) => {
      let newvalue = e.target.value;
      if (event !== 'data' || newvalue !== '') {
        if (event == 'data') {
          newvalue = encodeURIComponent(newvalue);
        } else if (event == 'color') {
          newvalue = newvalue.substr(1);
        } else if (event == 'size') {
          newvalue = Math.min(Math.max(newvalue, minSize), maxSize);
        } console.log(event);
        props.setParams({ ...props.params, [event]: newvalue });
      }
    };
  };

  return (
    <div>
      <h2 className="title">データ入力</h2>
      <label className="label">文字列</label>
      <div className="field">
        <div className="control is-expanded">
          <textarea name="data" className="textarea" defaultValue={props.params.data} onChange={handleChange('data')} ></textarea>
        </div>
      </div>

      <label className="label">色</label>
      <div className="field">
        <div className="control">
          <input name="color" className="input" type="color" defaultValue={props.params.color} onChange={handleChange('color')} />
        </div>
      </div>

      <label className="label">サイズ（50px～1000px）</label>
      <div className="field has-addons">
        <p className="control">
          <input name="size" className="input" type="number" min="50" max="1000" key={props.params.size} defaultValue={props.params.size} onBlur={handleChange('size')} />
        </p>
        <p className="control">
          <a className="button is-static">
            px
          </a>
        </p>
      </div>

      <label className="label">誤り訂正</label>
      <div className="field">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="ecc" defaultValue={props.params.ecc} onChange={handleChange('ecc')}>
              <option value="L">レベルL（7%まで復元）</option>
              <option value="M">レベルM（15%まで復元）</option>
              <option value="Q">レベルQ（25%まで復元）</option>
              <option value="H">レベルH（30%まで復元）</option>
            </select>
          </div>
        </div>
      </div>

      <label className="label">ファイル形式</label>
      <div className="field">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="format" defaultValue={props.params.format} onChange={handleChange('format')}>
              <option value="png">PNG</option>
              <option value="jpg">JPEG</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Viewer(props) {
  return (
    <div>
      <h2 className="title">生成結果</h2>
      <figure>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.params.data}&color=${props.params.color}&size=${props.params.size}x${props.params.size}&ecc=${props.params.ecc}&format=${props.params.format}`} alt="QRコード" />
      </figure>
    </div>
  );
}

function Main() {
  const [params, setParams] = useState({ data: 'https://', color: '000000', size: 200, ecc: 'L', format: 'png' });

  return (
    <main>
      <section className="section">
        <div className="container">
          <About />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Form params={params} setParams={setParams} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Viewer params={params} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>This QR code is created with <a href="https://goqr.me/api/">QR code API</a></p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;