import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import Col from 'antd/es/col';
import Modal from 'antd/es/modal';
import Row, {RowProps} from 'antd/es/row';
import Spin from 'antd/es/spin';
import Typography from 'antd/es/typography';

import HomeFilled from '@ant-design/icons/HomeFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import {A} from 'components';

interface Props {
  showBreadCrumb?: boolean;
  loading?: boolean | string;
  title?: string;
}

const PageContentsLayout: FC<RowProps & Props> = ({
  children,
  align,
  showBreadCrumb,
  justify,
  gutter,
  loading,
  title,
}) => {
  const [breadCrumb, setBreadCrumb] = useState<ReactNode[]>();
  const getBreadCrumb = useCallback(() => {
    const url = window.location.pathname.split('/').filter((path: string) => !!path.length);

    const getHref = (index: number) =>
      '/'.concat(
        url
          .slice(0, index + 1)
          .join('/')
          .concat('/'),
      );

    const getBreadcrumbItem = (index: number, link = true, displayPrevPath = false) => {
      const path = displayPrevPath && index > 0 ? url[index - 1] : url[index];
      const pathArray = path.split('-').map((section: string) => section.charAt(0).toUpperCase() + section.slice(1));
      const breadCrumbText = pathArray.join(' ');
      if (link) {
        return (
          <A href={getHref(index)} key={index}>
            <Breadcrumb.Item>{index === 0 ? <HomeFilled /> : breadCrumbText}</Breadcrumb.Item>
          </A>
        );
      }
      return <Breadcrumb.Item key={index}>{breadCrumbText}</Breadcrumb.Item>;
    };

    const breadCrumbItems = url.reduce((acc: ReactNode[], path: string, i: number) => {
      if (path.length === 0) return acc;
      const isLastPath = i !== url.length - 1;
      if (path.length !== 64) {
        acc.push(getBreadcrumbItem(i, isLastPath));
      } else {
        acc[acc.length - 1] = getBreadcrumbItem(i, true, true);
      }
      return acc;
    }, []);

    return breadCrumbItems;
  }, []);

  useEffect(() => {
    const breadCrumbs = getBreadCrumb();
    if (breadCrumbs.length > 1) setBreadCrumb(breadCrumbs);
  }, [getBreadCrumb]);

  return (
    <>
      <Modal
        bodyStyle={{backgroundColor: 'lightgray', padding: '40px', textAlign: 'center', fontWeight: 'bold'}}
        centered
        closable={false}
        visible={!!loading}
        footer={null}
      >
        <Spin
          indicator={<LoadingOutlined />}
          size="large"
          tip={!!loading && typeof loading === 'string' ? loading : ''}
        />
      </Modal>

      <Row justify="space-between" align={'middle'} style={{padding: `${breadCrumb ? '20px' : '25px'} 0px`}}>
        {title && (
          <Col>
            <Typography.Title level={3} style={{margin: '0px', padding: '0px 10px'}}>
              {' '}
              {title}
            </Typography.Title>
          </Col>
        )}
        <Col>{breadCrumb && showBreadCrumb && <Breadcrumb>{breadCrumb}</Breadcrumb>}</Col>
      </Row>

      <Row
        align={align ?? 'top'}
        justify={justify ?? 'start'}
        gutter={gutter ?? [20, 30]}
        style={{paddingBottom: '50px'}}
      >
        {children}
      </Row>
    </>
  );
};
export default PageContentsLayout;
