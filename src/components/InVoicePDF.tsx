import { Page, View, Document } from "@react-pdf/renderer";

import Navbar from "./user/Navbar";

const InVoicePDF = () => {
  return (
    <Document>
      <Page size="A4"></Page>
      <View>
        <Navbar />
      </View>
    </Document>
  );
};

export default InVoicePDF;
