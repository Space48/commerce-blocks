<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DesignResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id ?? null,
            'name' => $this->name ?? null,
            'heading_font_family' => $this->heading_font_family ?? null,
            'heading_font_size' => $this->heading_font_size ?? null,
            'heading_font_weight' => $this->heading_font_weight ?? null,
            'heading_colour' => $this->heading_colour ?? null,
            'text_font_family' => $this->text_font_family ?? null,
            'text_font_weight' => $this->text_font_family ?? null,
            'text_font_size' => $this->text_font_size ?? null,
            'text_colour' => $this->text_colour ?? null,
            'price_font_family' => $this->price_font_family ?? null,
            'price_font_size' => $this->price_font_size ?? null,
            'price_font_weight' => $this->price_font_weight ?? null,
            'price_colour' => $this->price_colour ?? null,
            'sale_price_font_size' => $this->sale_price_font_size ?? null,
            'sale_price_font_weight' => $this->sale_price_font_weight ?? null,
            'sale_price_colour' => $this->sale_price_colour ?? null,
            'link_colour' => $this->link_colour ?? null,
            'link_hover_colour' => $this->link_hover_colour ?? null,
            'button_font_family' => $this->button_font_family ?? null,
            'button_font_weight' => $this->button_font_weight ?? null,
            'button_font_size' => $this->button_font_size ?? null,
            'button_colour' => $this->button_colour ?? null,
            'button_hover_colour' => $this->button_hover_colour ?? null,
            'button_text_colour' => $this->button_text_colour ?? null,
            'button_hover_text_colour' => $this->button_hover_text_colour ?? null,
            'columns' => $this->columns ?? null,
            'limit' => $this->limit ?? null,
        ];
    }
}
