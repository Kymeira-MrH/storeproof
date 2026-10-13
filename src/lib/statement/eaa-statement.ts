import type { ScanResult } from "../scanner/types";
import type { RiskScore } from "../scoring/risk-score";

export interface MerchantDetails {
  legalName: string;
  contactEmail: string;
  storeUrl: string;
}

export function generateEaaStatement(
  merchant: MerchantDetails,
  result: ScanResult,
  score: RiskScore,
  preparedOn: string,
): string {
  const conformance = score.totalViolations === 0 ? "fully conformant" : "partially conformant";
  const knownIssues =
    result.violations.length === 0
      ? "No automated violations were detected at the time of preparation."
      : result.violations
          .map((v) => `- ${v.help} (${v.impact}, ${v.nodes} element(s); ref: ${v.id})`)
          .join("\n");
  return `# Accessibility Statement

${merchant.legalName} is committed to making ${merchant.storeUrl} accessible in line with
the European Accessibility Act (EAA) and EN 301 549, which adopts WCAG 2.2 Level AA.

## Conformance status
This website is ${conformance} with WCAG 2.2 Level AA.

## Known non-conformances (as of ${preparedOn})
${knownIssues}

## Preparation
This statement was prepared on ${preparedOn} from an automated scan using the axe-core
rules engine. An automated scan does not establish full WCAG conformance; issues requiring
human judgement (meaningful alternative text, keyboard operation, screen-reader behaviour)
are assessed separately during remediation.

## Feedback and contact
If you encounter accessibility barriers, contact ${merchant.contactEmail}.

## Enforcement
If you are not satisfied with our response, you may contact the accessibility supervisory
authority in your EU member state.
`;
}
