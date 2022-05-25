import React, { forwardRef, Fragment } from "react";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { StatefulMenu } from "baseui/menu";
import { Spinner, SIZE } from "baseui/spinner";
import Delete from "baseui/icon/delete";

export function Typeahead({
  isLoading = false,
  query,
  onQueryChange,
  onClearQuery,
  items,
  onItemSelect,
  renderListItem,
  listStyles = {},
  ...restProps
}) {
  return (
    <Fragment>
      <Input
        type="text"
        value={query}
        onChange={onQueryChange}
        endEnhancer={
          <Fragment>
            {isLoading ? (
              <Spinner $color="#000" $size={SIZE.small} />
            ) : (
              <Button size="compact" onClick={onClearQuery} kind="secondary">
                <Delete />
              </Button>
            )}
          </Fragment>
        }
        {...restProps}
      />
      {items.length > 0 && (
        <StatefulMenu
          items={items}
          onItemSelect={({ item }) => {
            onItemSelect(item);
          }}
          overrides={{
            List: {
              style: { ...listStyles },
            },
            Option: {
              props: {
                overrides: {
                  ListItem: {
                    component: forwardRef(renderListItem),
                  },
                },
              },
            },
          }}
        />
      )}
    </Fragment>
  );
}
