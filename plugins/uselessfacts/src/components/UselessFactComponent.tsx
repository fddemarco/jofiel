import {useAsync} from 'react-use';
import {
    Progress,
    ResponseErrorPanel,
    InfoCard,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { UselessFactApiRef } from '../api';
import { UselessFact } from '../types';
import { useEntity } from '@backstage/plugin-catalog-react'
import { UseUselessFactsAppData as useUselessFactsAppData } from './helper';
import { Box, Typography } from '@material-ui/core';

export const UselessFactCard = () => {
    const UselessFactClient = useApi(UselessFactApiRef);
    const {entity} = useEntity();
    const { uselessFactType } = useUselessFactsAppData({entity});

    const { value, loading, error } = useAsync(
        async (): Promise<UselessFact | undefined> => {
            return await UselessFactClient.getUselessFact(uselessFactType)
        },
    );
    if (loading) {
        return <Progress/>;
    } else if (error) {
        return <ResponseErrorPanel error={error}/>;
    }

    return (
        <Box>
            <InfoCard title="Facts">
                <Typography variant="body1">
                    <b>Id: </b>{value?.id}
                </Typography>
                <Typography>
                    <b>Fact: </b>{value?.text}
                </Typography>
                <Typography>
                    <b>Source: </b>{value?.source}
                </Typography>
                <Typography>
                    <b>Source URL: </b>{value?.source_url}
                </Typography>
            </InfoCard>
        </Box>
    );
};
