import React from 'react';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import PDFViewer from './PDFViewer';

const { Dragger } = Upload;

const App = () => {

  const [data, setData] = React.useState<string>("");
  const memoizedData = React.useMemo(() => data, [data]);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:3001/pdf-submit',
    method: 'POST',
    maxCount: 1,
    async onChange(info) {
      const { status } = info.file;
      console.log(info.file);
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);

        // Fetch the PDF
        var response = await fetch("http://localhost:3001/pdf-submit");
        console.log();
        // var body = await response.json();
        setData(await response.text());
        

      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content style={{ padding: '48px 48px' }}>
          <div>
            { !data && <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>

             
            </Dragger> } 
            { memoizedData && <PDFViewer pdfData={memoizedData} /> }
          </div>
        </Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default App;