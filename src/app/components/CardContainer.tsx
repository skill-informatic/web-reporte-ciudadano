import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CardTypes } from "../models/globalInfo.types";

interface Types {
  cards: CardTypes[];
  withColumn?: false;
}

const CardContainer = ({ cards, withColumn }: Types) => {
  return (
    <Grid
      sx={{
        display: "grid",

        gridTemplateColumns: withColumn
          ? {
              xs: "1fr 1fr",
              sm: "1fr",
              md: "1fr",
              lg: "1fr 1fr",
              xl: "230px 230px 230px",
            }
          : {
              xs: "1fr ",
              sm: "150px  ",
              md: "200px 200px ",
              lg: "1fr 1fr 1fr",
              xl: "230px 230px 230px",
            },

        justifyItems: {
          xs: "center",
          lg: "left",
        },
        columnGap: withColumn
          ? {
              xs: "3%",

              md: "1.5%",
              lg: "3%",
              xl: "3%",
            }
          : {
              xs: "3%",
              sm: "33%",
              md: "10%",
              lg: "3%",
              xl: "3%",
            },
        rowGap: {
          xs: "5%",
        },
      }}
    >
      {cards.map((carta: CardTypes, index: number) => (
        <Card
          key={index}
          sx={{
            color: "#767676",
            width: "230px",
            cursor: "pointer",
            height: "250px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: ".1rem hidden black",
            transition: "all .2s ease",
            boxShadow: "3px 3px 4px 1px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              transition: "all .2s ease",
              boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.4)",
            },
          }}
          onClick={() => carta.action(carta.id)}
        >
          <CardContent>
            <Box
              sx={{
                backgroundColor: "#7E5BFF",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <Box sx={{ color: "#fff" }}>{carta.icono}</Box>
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: "#767676",
                fontSize: "1.1rem",
              }}
            >
              {carta.name}
            </Typography>

            <Box component="div" sx={{ width: "150px", margin: "0 auto" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "400",
                  lineHeight: ".9rem",
                  fontFamily: "Open Sans",
                  fontSize: ".8rem",
                  color: "#B0B0B0",
                }}
              >
                {carta?.subtitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default CardContainer;
