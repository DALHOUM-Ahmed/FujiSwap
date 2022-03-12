import { Currency, ETHER, Token } from '@uniswap/sdk';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import EthereumLogo from '../../assets/images/ethereum-logo.png';
import useHttpLocations from '../../hooks/useHttpLocations';
import { WrappedTokenInfo } from '../../state/lists/hooks';
import Logo from '../Logo';

// const getTokenLogoURL = (address: string) => `public/images/192x192_App_Icon.png`;

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`;

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency;
  size?: string;
  style?: React.CSSProperties;
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return [];
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, 'public/images/192x192_App_Icon.png'];
      }

      return ['public/images/192x192_App_Icon.png'];
    }
    return [];
  }, [currency, uriLocations]);

  if (currency?.symbol === 'SHIBURAI') {
    return (
      <StyledLogo
        size={size}
        srcs={[
          'https://img1.wsimg.com/isteam/ip/f3e28b3c-6aac-4bf6-b9c7-26f14d67e682/favicon/4c131c6b-ea27-43c7-a736-91c1802ad1a5.png',
        ]}
        alt={`${currency?.symbol ?? 'token'} logo`}
        style={style}
      />
    );
  }

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />;
}
