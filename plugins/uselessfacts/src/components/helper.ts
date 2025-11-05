import { Entity } from '@backstage/catalog-model';

export const USELESSFACT_TYPE = 'uselessfacts/uselessfact_type'
export const UseUselessFactsAppData = ({entity}: {entity: Entity}) => {
    const uselessFactType = entity?.metadata.annotations?.[USELESSFACT_TYPE] ?? '';
    if (!uselessFactType) {
        throw new Error("'Useless facts' annotations arae missing");
    }
    return {uselessFactType};
}
