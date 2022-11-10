import {Flex, FlexItem, Link} from "@bigcommerce/big-design";
import {theme} from "@bigcommerce/big-design-theme";
import React from "react";

const LegalFooter = () => {

  return (
    <Flex justifyContent="flex-end" marginVertical="medium" flexDirection="row">
      <FlexItem marginHorizontal="small" marginVertical="xSmall">
        <Link
          target="_blank"
          style={{color: theme.colors.secondary60}}
          href="https://www.space48.com/apps-privacy-policy">
          Privacy Policy
        </Link>
      </FlexItem>
      <FlexItem marginLeft="small" marginVertical="xSmall">
        <Link
          target="_blank"
          style={{color: theme.colors.secondary60}}
          href="https://www.space48.com/apps-terms-and-conditions">
          Terms & Conditions
        </Link>
      </FlexItem>
    </Flex>
  )
}

export default LegalFooter;
