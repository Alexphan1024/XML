<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
               <H1>Teacher Timetable</H1>
               <xsl:for-each select="program/instructor">
                    <xsl:sort select="@name" order="ascending"/>
                    <H2>
                        <xsl:value-of select="@name" />
                    </H2>
                    <table border="1" style="width:100%; height:50%;">
                        <tr>
                            <th></th>
                            <th>0830</th>
                            <th>0930</th>
                            <th>1030</th>
                            <th>1130</th>
                            <th>1230</th>
                            <th>1330</th>
                            <th>1430</th>
                            <th>1530</th>
                            <th>1630</th>
                        </tr>
                        <tr>
                            <th>Monday</th>
                            <xsl:if test="count(course/day[text() = 'Mon']) = 2">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Mon'">
                                            <xsl:if test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </xsl:if>
                                            <xsl:if test="beginTime=1330">
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                             <xsl:if test="count(course/day[text() = 'Mon']) = 1">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Mon'">
                                        <xsl:choose>
                                            <xsl:when test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </xsl:when>          
                                            <xsl:when test="beginTime=1330">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:when>
                                            <xsl:otherwise>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                        </tr>
                        <tr>
                            <th>Tuesday</th>
                             <xsl:if test="count(course/day[text() = 'Tue']) = 2">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Tue'">
                                            <xsl:if test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </xsl:if>
                                            <xsl:if test="beginTime=1330">
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                             <xsl:if test="count(course/day[text() = 'Tue']) = 1">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Tue'">
                                        <xsl:choose>
                                            <xsl:when test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </xsl:when>          
                                            <xsl:when test="beginTime=1330">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:when>
                                            <xsl:otherwise>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                        </tr>
                        <tr>
                            <th>Wednesday</th>
                             <xsl:if test="count(course/day[text() = 'Wed']) = 2">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Wed'">
                                            <xsl:if test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </xsl:if>
                                            <xsl:if test="beginTime=1330">
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                             <xsl:if test="count(course/day[text() = 'Wed']) = 1">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Wed'">
                                        <xsl:choose>
                                            <xsl:when test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </xsl:when>          
                                            <xsl:when test="beginTime=1330">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:when>
                                            <xsl:otherwise>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                        </tr>
                        <tr>
                            <th>Thursday</th>
                             <xsl:if test="count(course/day[text() = 'Thu']) = 2">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Thu'">
                                            <xsl:if test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </xsl:if>
                                            <xsl:if test="beginTime=1330">
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                             <xsl:if test="count(course/day[text() = 'Thu']) = 1">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Thu'">
                                        <xsl:choose>
                                            <xsl:when test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </xsl:when>          
                                            <xsl:when test="beginTime=1330">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:when>
                                            <xsl:otherwise>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                        </tr>
                        <tr>
                            <th>Friday</th>
                             <xsl:if test="count(course/day[text() = 'Fri']) = 2">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Fri'">
                                            <xsl:if test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </xsl:if>
                                            <xsl:if test="beginTime=1330">
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                             <xsl:if test="count(course/day[text() = 'Fri']) = 1">
                            <xsl:for-each select="course">
                                <xsl:sort select="beginTime" data-type="number" order="ascending"/>
                                <xsl:if test="day='Fri'">
                                        <xsl:choose>
                                            <xsl:when test="beginTime=830">
                                                 <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </xsl:when>          
                                            <xsl:when test="beginTime=1330">
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th> 
                                                <th>
                                                    <xsl:value-of select="@name" /> <br></br>
                                                    <xsl:value-of select="BldgRoom" />&#160;(<xsl:value-of select="act" />)<br></br>
                                                    #<xsl:value-of select="crn" />
                                                </th>
                                                <th></th>
                                            </xsl:when>
                                            <xsl:otherwise>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                </xsl:if>
                            </xsl:for-each>
                            </xsl:if>
                        </tr>
                    </table>
               </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>