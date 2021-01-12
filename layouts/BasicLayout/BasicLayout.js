import { Container } from 'semantic-ui-react';
import classnames from 'classnames';
import Header from '../../components/Header';

export default function BasicLayout({children, className}) {
    return (
        <Container fluid className={classnames("basic-layout",{
            [className]: className,
        })}>

            <Header />

            <Container className="basic-layout__content" >
                {children}
            </Container>

        </Container>
    )
}
