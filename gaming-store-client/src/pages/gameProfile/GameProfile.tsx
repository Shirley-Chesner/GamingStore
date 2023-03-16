import React from 'react';
import { useParams } from 'react-router-dom';

export const GameProfile: React.FC = () => {
    const { id } = useParams();

    return <div>{id}</div>;
};
