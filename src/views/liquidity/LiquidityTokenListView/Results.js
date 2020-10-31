import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import NeutralIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {},
  positiveIcon: {
    color: theme.palette.text.tertiary
  },
  negativeIcon: {
    color: theme.palette.text.negative
  },
  positiveValue: {
    color: theme.palette.text.tertiary,
    marginRight: theme.spacing(1)
  },
  negativeValue: {
    color: theme.palette.text.negative,
    marginRight: theme.spacing(1)
  }
}));

const Results = ({ className, tokens, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Token Name
                </TableCell>
                <TableCell>
                  Volume Change (24 hr.)
                </TableCell>
                <TableCell>
                  Liquidity Change (24 hr.)
                </TableCell>
                <TableCell>
                  Tx Change (24 hr.)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.length > 0
                ? tokens.slice(0, limit).map((token) => (
                  <TableRow
                    hover
                    key={token.id}
                  >
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {token.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {token.volumeChange.includes('-')
                          ? (
                            <ArrowDownwardIcon
                              className={classes.negativeIcon}
                            />
                          )
                          : (parseInt(token.volumeChange, 10) === 0
                            ? <NeutralIcon />
                            : (
                              <ArrowUpwardIcon
                                className={classes.positiveIcon}
                              />
                            )
                          )}
                        <Typography
                          className={token.volumeChange.includes('-')
                            ? classes.negativeValue
                            : parseInt(token.volumeChange, 10) === 0
                              ? null
                              : classes.positiveValue}
                          variant="body2"
                        >
                          {token.volumeChange}
                          %
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {token.liquidityChange.includes('-')
                          ? (
                            <ArrowDownwardIcon
                              className={classes.negativeIcon}
                            />
                          )
                          : (parseInt(token.liquidityChange, 10) === 0
                              ? <NeutralIcon />
                              : (
                                <ArrowUpwardIcon
                                  className={classes.positiveIcon}
                                />
                              )
                          )}
                        <Typography
                          className={token.liquidityChange.includes('-')
                            ? classes.negativeValue
                            : parseInt(token.liquidityChange, 10) === 0
                              ? null
                              : classes.positiveValue}
                          variant="body2"
                        >
                          {token.liquidityChange}
                          %
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {token.txChange.includes('-')
                          ? (
                            <ArrowDownwardIcon
                              className={classes.negativeIcon}
                            />
                          )
                          : (parseInt(token.txChange, 10) === 0
                              ? <NeutralIcon />
                              : (
                                <ArrowUpwardIcon
                                  className={classes.positiveIcon}
                                />
                              )
                          )}
                        <Typography
                          className={token.txChange.includes('-')
                            ? classes.negativeValue
                            : parseInt(token.txChange, 10) === 0
                              ? null
                              : classes.positiveValue}
                          variant="body2"
                        >
                          {token.txChange}
                          %
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) : null}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={tokens.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  tokens: PropTypes.array.isRequired
};

export default Results;
