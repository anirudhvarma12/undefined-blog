---
title: 'Bolt CMS: Using content types and relations'
date: '2017-12-18'
---

For a recent website project, I decided to use [Bolt CMS,](https://bolt.cm/) a
free and open source content management system that is really powerful while
being flexible and easy to use. One concept that I really liked was that of
[ContentTypes,](https://docs.bolt.cm/3.4/contenttypes/intro)

From the documentation —

> Most websites will also have some form of news-like items, that are shown based
> on the date that they were published. Some other sites might have ‘book reviews’
> or ‘event dates’ or even completely different content. All of these different
> types of content are called **ContentTypes** in Bolt, and you can add as many
> different ContentTypes as you need.
> Each ContentType is made up of **Fields….**

Our project was a dance company site, so we defined the following Content Types
—

1.  Team Members.
1.  Videos
1.  Series (Collection of Videos)

In Bolt, all contenttypes are defined in _contenttypes.yml_. Here is what a
sample contenttype looks like —

This is pretty similar to creating a database table with the fields title,
description, frameUrl & type. The _record_template_ indicates the twig template
to be used when the page for this content type is rendered.

## Relations

Your database has relations, so it would be amazing if your contenttypes had
relations, right? Bolt supports creating Relationships between your content
types and it is pretty straight forward. Here is the _Series_ contenttype —

Now, as I mentioned earlier. Series is a collection of Videos. The key here is
_relations_ configuration. The _works_ field maps _series_ to the _works_ contenttype.<br> Multiple — true means that multiple *works *records can be
associated to one _series_ record.

## Retrieving and rendering related records in templates

Here is how to list all related records in twig templates.

Here, the _record_ refers to the current series.

You can read more about relationships here —
[https://docs.bolt.cm/3.4/contenttypes/relationships#](https://docs.bolt.cm/3.4/contenttypes/relationships#)

About relations in templates —
[https://docs.bolt.cm/3.4/contenttypes/relationships#relations-in-templates](https://docs.bolt.cm/3.4/contenttypes/relationships#relations-in-templates)

This is the first project that I have developed with Bolt CMS and really liked
working with it so far, the extension ecosystem looks healthy and the future
looks promising.
