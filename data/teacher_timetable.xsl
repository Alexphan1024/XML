<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h2>
                    <xsl:value-of select="menu/restaurant" />
                </h2>
                <ul>
                    <xsl:for-each select="/menu/category">
                        <h4>
                            <xsl:value-of select="@type" />
                            <xsl:if test="fooditem/foodtype='V'">
                                <img src="happy.png" height="15" width="15"></img>
                            </xsl:if>
                            <br></br>
                            Avg. Price:
                            <xsl:value-of select="round(sum(fooditem/price) div count(fooditem/price)*100) div 100" />
                            <br />
                            <xsl:value-of select="count(fooditem)" />
                            Items
                        </h4>
                        <xsl:apply-templates select="fooditem" />
                    </xsl:for-each>
                </ul>
                <h3>Prices accurate as of March 31 2019</h3>
                <h3>
                    Typical cost for a typical family: $
                    <xsl:value-of select="round(100 * (sum(/menu/category[1]/fooditem/price) div count(/menu/category[1]/fooditem/price) + sum(/menu/category[2]/fooditem/price) div count(/menu/category[2]/fooditem/price) + 2*sum(/menu/category[3]/fooditem/price) div count(/menu/category[3]/fooditem/price))) div 100" />
                </h3>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="fooditem">
        <li>
            <xsl:value-of select="@name" />
            --&#160;$
            <xsl:value-of select="price" />
            <xsl:if test="foodtype='V'">
                <img src="leaf.png" height="15" width="15"></img>
            </xsl:if>
        </li>
        <b>
            <xsl:value-of select="pcs" />
        </b>
    </xsl:template>
</xsl:stylesheet>