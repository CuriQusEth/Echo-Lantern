import { encodeFunctionData, type Hex } from 'viem';

export const BUILDER_CODE = 'bc_4b4ucpek';

export interface AttributionData {
  appId?: string;
  builderCode?: string;
}

/**
 * Encodes attribution data to be appended to transaction calldata,
 * following the conceptual ERC-8021 structure.
 */
export function encodeAttributionCalldata(calldata: Hex, data?: AttributionData): Hex {
  // In a real implementation this would formally conform to the ERC.
  // For this demo context, we format the comment/builder trace 
  // and append safely or encode via specific contract abi if appropriate.
  
  // Here we just mock the payload transformation that would be passed to a 
  // smart contract expecting ERC-8021 formatting.
  const appSegment = data?.appId ? `[ATTRIBUTION_CODE:${data.appId}]` : '';
  const builderSegment = data?.builderCode ? `[BUILDER_CODE:${data.builderCode}]` : '';
  
  console.log(`[ERC-8021] Tracking TX with ${appSegment} ${builderSegment}`);
  return calldata; // Return original for demo if we don't have a specific router
}
