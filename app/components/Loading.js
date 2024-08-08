import React, { useEffect, useState } from 'react';
import PageLoader from './PageLoader';

function Loading() {
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {pageLoading && <PageLoader />}
        </>
    );
}

export default Loading;
